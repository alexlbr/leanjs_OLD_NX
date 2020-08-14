/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import * as Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import { createGlobalStyle } from 'styled-components';
import { Box } from '@leanjs/ui-core';

const GlobalStyle = createGlobalStyle`
:root {
    --plyr-color-main: rgba(97,218,251,1);
}
.plyr {
    min-width:150px;
}
.plyr--video {
    height: auto;
}
.plyr--video.plyr--stopped .plyr__controls {
     display: none;
}
`;

function useHls({ url, autoplay = false, autoload = true, onClick, ref }) {
  const videoRef = useRef();
  const controllerRef = useRef({});
  const [error, setError] = useState(null);
  // const [loadingStarted, setLoadingStarted] = useState(autoload)

  function startLoad() {
    const { player } = controllerRef.current;
    if (!autoload && player) {
      player.startLoad();
      // setLoadingStarted(true)
    }
  }

  useEffect(() => {
    function initPlayer() {
      if (Hls.isSupported()) {
        // import Plyr from 'plyr' breaks on SSR, to we require it on the client
        const Plyr = require('plyr');
        const plyr = new Plyr(videoRef.current, {
          autoplay,
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'airplay',
            'fullscreen',
          ],
        });

        plyr.on('play', startLoad);

        const { player } = controllerRef.current;
        if (player) {
          player.destroy();
        }

        const hls = new Hls({ autoStartLoad: autoload });

        controllerRef.current = { player: hls, videoElement: videoRef };
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(url);
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                initPlayer(); // TODO should we try again or do setError?
                break;
            }
          }
        });
      } else if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
      ) {
        videoRef.current.src = url;
        videoRef.current.addEventListener('error', () => {
          setError(
            `${videoRef.current.error.constructor.name} code ${videoRef.current.error.code}`
          );
        });
      }
    }

    initPlayer();

    return () => {
      const { player } = controllerRef.current;
      if (player) {
        player.destroy();
      }
    };
  }, [url, autoplay, autoload]);

  useImperativeHandle(
    ref && Object.prototype.hasOwnProperty.call(ref, 'current') ? ref : null,
    () => ({
      get player() {
        return controllerRef.current.player;
      },
      get videoElement() {
        return controllerRef.current.videoElement;
      },
    })
  );

  function handleVideoClick(event) {
    startLoad();
    if (videoRef.current) {
      videoRef.current.play();
    }
    onClick && onClick(event);
  }

  return {
    handleVideoClick,
    error,
    videoRef,
    // loadingStarted,
  };
}

export const VideoPlayer = (
  {
    playbackId = null,
    thumbnailSecond = 1,
    thumbnailWidth = 640,
    posterUrl = null,
    startSecond = 1,
    autoplay = false,
    autoload = false,
    muted = true,
    showControls = true,
    sx = {},
    className = null,
    url,
    ...rest
  },
  ref
) => {
  // TODO implement startSecond in useHls

  //   const poster = posterUrl
  //     ? posterUrl
  //     : playbackId
  //     ? `https://image.mux.com/${playbackId}/thumbnail.png?width=${thumbnailWidth}&amp;fit_mode=preserve&amp;time=${thumbnailSecond}`
  //     : null;
  const { videoRef, error, handleVideoClick, loadingStarted } = useHls({
    url,
    autoplay,
    autoload,
    ref,
  });

  return (
    <>
      <GlobalStyle />
      <video
        // TODO add forward ref to Box so we can add the sx prop to this <video> using <Box> instead
        // sx={{ width: '100%', cursor: "pointer", ...sx }}
        // style={{ width: '100%' }}
        onClick={handleVideoClick}
        controls={loadingStarted}
        muted={autoplay || muted}
        autoPlay={autoplay}
        ref={videoRef}
        poster={posterUrl}
        className={className}
        {...rest}
      />
      {error && <p>There was an error loading this video ({error}).</p>}
    </>
  );
};
