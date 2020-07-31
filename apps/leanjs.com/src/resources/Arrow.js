import React from 'react';

function Icon({ color = '#3868BE', width = 500 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      version="1"
      fill={color}
      viewBox="0 0 802 330"
      style={{ maxWidth: '100%' }}
    >
      <path
        d="M174 3021c-45-28-64-59-64-108 0-43 231-1116 251-1166 15-35 54-63 100-72 76-14 149 48 149 128 0 20-22 139-50 264-27 125-48 228-47 230 2 1 39-39 83-90 114-133 388-411 539-546 583-522 1213-894 1910-1126 402-134 751-206 1205-247 170-15 652-15 830 1 734 63 1407 236 2160 553 200 85 540 248 540 260 0 18-111 228-120 228-6 0-63-26-128-59-386-193-894-390-1319-511-827-236-1663-291-2398-160-1040 186-1971 693-2765 1506-226 231-528 594-484 580 11-3 147-37 304-76 253-64 289-70 322-61 69 21 110 98 89 164-25 75-26 75-543 206-262 67-490 121-505 121s-42-9-59-19z"
        transform="matrix(.1 0 0 -.1 0 330)"
      ></path>
    </svg>
  );
}

export default Icon;
