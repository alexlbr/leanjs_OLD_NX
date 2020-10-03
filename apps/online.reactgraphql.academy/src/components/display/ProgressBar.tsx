import React from 'react';
import { Box, SxProp } from '../layout';

interface Props {
  progress: number;
  backgroundColorTop?: string;
  backgroundColorBottom?: string;
  borderRadius?: number;
  height?: number;
  sx?: SxProp;
}

function ProgressBar({
  progress = 0,
  backgroundColorTop = 'rgb(84,240,84)',
  backgroundColorBottom = 'rgb(43,194,83)',
  borderRadius = 8,
  height = 16,
  sx = {},
}: Props) {
  return (
    <Box
      sx={{
        borderRadius: `${borderRadius}px`,
        display: 'block',
        height: `${height}px`,
        width: '100%',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(#e9ecef, #e0e1e2)`,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: `${progress}%`,
          backgroundImage: `linear-gradient(${backgroundColorTop}, ${backgroundColorBottom})`,
          display: 'block',
          height: `100%`,
        }}
      />
    </Box>
  );
}

export default ProgressBar;
