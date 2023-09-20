import React from 'react'

const css = `
  html[data-theme="dark"] .text {
    fill: #0C0C0C;
  }

  html[data-theme="dark"] .bg {
    fill: white;
  }

  .graphic-icon {
    width: 50px;
    height: 50px;
  }
`

export const Icon = () => {
  return <img src="/assets/ipsos-rise-portrait.svg" />
}
