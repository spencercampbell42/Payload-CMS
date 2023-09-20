import React from 'react'

const css = `
  html[data-theme="dark"] path {
    fill: white;
  }

  .graphic-logo {
    width: 150px;
    height: auto;
  }`

export const Logo = () => {
  return <img src="/assets/ipsos-rise-portrait.svg" />
}
