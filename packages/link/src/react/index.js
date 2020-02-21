import { css } from 'glamor'
import filterReactProps from '@pluralsight/ps-design-system-filter-react-props'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { appearances } from '../vars/index.js'

import PropTypes from 'prop-types'
import React from 'react'

import stylesheet from '../css/index.js'

const style = ({ appearance, themeName }) =>
  css(
    stylesheet[`.psds-link`],
    appearance === appearances.default
      ? stylesheet[
          `.psds-link--appearance-${appearance}.psds-theme--${themeName}`
        ]
      : stylesheet[`.psds-link--appearance-${appearance}`]
  )

const Link = React.forwardRef((props, forwardedRef) => {
  const ref = forwardedRef || React.useRef()
  const themeName = useTheme()

  let tagName = 'a'
  React.useEffect(_ => {
    if (ref.current && ref.current.tagName) tagName = ref.current.tagName
  })

  const { children, ...rest } = props
  return React.cloneElement(React.Children.only(props.children), {
    ...style({ ...props, themeName }),
    ...filterReactProps(rest, { tagName })
  })
})

Link.appearances = appearances

Link.propTypes = {
  appearance: PropTypes.oneOf(Object.keys(appearances)),
  children: PropTypes.element.isRequired
}
Link.defaultProps = {
  appearance: appearances.default
}

export { appearances }

export default Link
