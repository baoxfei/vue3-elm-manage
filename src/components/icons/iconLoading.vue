<template>
  <div class="loading-container">
    <svg class="circular" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
    </svg>
  </div>
</template>

<style lang="scss">
    .circular {
      display: inline;
      width: 200px;
      animation: loading-rotate 2s linear infinite;
    }

    @keyframes loading-rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: var(--parmary-color);
      stroke-linecap: round;
    }

    @keyframes loading-dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }

      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40px;
      }

      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120px;
      }
    }

    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
</style>