import ScreenReaderOnly from '@pluralsight/ps-design-system-screenreaderonly'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import {
  HTMLPropsFor,
  RefForwardingComponent,
  ValueOf
} from '@pluralsight/ps-design-system-util'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import stylesheet from '../css/index'
import * as vars from '../vars/index'

const glamor = glamorDefault || glamorExports

const radius = vars.style.width / 2 - vars.style.strokeWidth / 2
const circumference = 2 * Math.PI * radius
const spin = glamor.keyframes({
  to: {
    transform: 'rotate(270deg)'
  }
})

type StyleFn = (
  themeName: string,
  props: CircularProgressProps
) => glamorExports.StyleAttribute

const styles: { [key: string]: StyleFn } = {
  circularprogress: (themeName, { size = vars.sizes.medium }) =>
    glamor.css(stylesheet[`.psds-circularprogress--size-${size}`]),

  svg: (themeName, { value }) => {
    const noValue = typeof value === 'undefined'

    return glamor.compose(
      glamor.css(stylesheet['.psds-circularprogress__svg']),
      noValue &&
        glamor.css(
          stylesheet['.psds-circularprogress__svg--no-value']({ spin })
        )
    )
  },

  bg: (themeName, _props) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-circularprogress__bg']),
      glamor.css(
        stylesheet[`.psds-circularprogress__bg.psds-theme--${themeName}`]
      )
    ),

  fg: (themeName, _props) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-circularprogress__fg']),
      glamor.css(
        stylesheet[`.psds-circularprogress__fg.psds-theme--${themeName}`]
      )
    )
}

interface CircularProgressProps extends HTMLPropsFor<'div'> {
  size?: ValueOf<typeof vars.sizes>
  value?: number
}

interface CircularProgressStatics {
  sizes: typeof vars.sizes
}

interface CircularProgressComponent
  extends RefForwardingComponent<
    CircularProgressProps,
    HTMLDivElement,
    CircularProgressStatics
  > {}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>((props, ref) => {
  const defaultIndeterminateValue = 25
  const { size, value = defaultIndeterminateValue, ...rest } = props
  const themeName = useTheme()

  const dashOffset = ((100 - value) / 100) * circumference

  return (
    <div ref={ref} {...styles.circularprogress(themeName, props)} {...rest}>
      <ScreenReaderOnly role="region" aria-live="off">
        {typeof props.value === 'undefined'
          ? 'Loading...'
          : `${value}% complete`}
      </ScreenReaderOnly>
      <svg
        {...styles.svg(themeName, props)}
        viewBox={`0 0 ${vars.style.width} ${vars.style.width}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle r={radius} cx="24" cy="24" {...styles.bg(themeName, props)} />
        <circle
          r={radius}
          cx="24"
          cy="24"
          {...styles.fg(themeName, props)}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </div>
  )
}) as CircularProgressComponent

CircularProgress.sizes = vars.sizes
export const sizes = vars.sizes

export default CircularProgress
