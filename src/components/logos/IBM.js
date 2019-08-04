import React from 'react'

const IBM = ({ colour = '#00d5b5', width, height }) => (
  <svg viewBox="0 -85 1054 500" width={width} height={height}>
    <clipPath id="b">
      <path d="M0-1v83h55.937v236H1.523v82h194.65v-82h-55.938V82h54.414V-1zm554.02 1v82h55.938v236h-54.414v82h138.71V171.84l82.656 228.08 1.68.04 81.172-228.12V400h140.23v-82h-55.938V82h54.415V0h-156.33l-64.726 182.89L711.866 0z" />
      <path
        id="a"
        d="M222.23 0v82h55.937v130h215.31v-24.928s18.011-14.042 23.75-27.367l11.523-25.855s5.352-14.472 5.352-27.405l-2.305-25.855s-3.616-21.063-9.922-27.328l-22.266-25.895S471.276 0 433.75 0zm140.23 82h81.992v76H362.46z"
      />
      <use transform="matrix(1 0 0 -1 0 400)" xlinkHref="#a" />
    </clipPath>
    <path
      fill="none"
      stroke={colour}
      strokeWidth="27.37"
      d="M0 13.683h1030v53.232H0m0 53.232h975v53.242H0v53.222h975v53.222H0m0 53.242h1030v53.242H0"
      clipPath="url(#b)"
    />
  </svg>
)

export default IBM
