// TODO: remove
import filterReactProps from '@pluralsight/ps-design-system-filter-react-props'
import Halo from '@pluralsight/ps-design-system-halo'
import {
  CaretLeftIcon,
  CaretRightIcon,
  sizes as iconSizes
} from '@pluralsight/ps-design-system-icon'
import { useTheme } from '@pluralsight/ps-design-system-theme'
import { ValueOf } from '@pluralsight/ps-design-system-util'
import { compose, css } from 'glamor'
import React from 'react'
import PropTypes from 'prop-types'

// TODO: reimport without .js
import CarouselContext from './context.js'
import stylesheet from '../css/index.js'
import { combineFns, toValues } from '../js/utils.js'
import * as vars from '../vars/index.js'

// TODO: flip param order to match most other components = props, themeName
const styles = {
  control: (_, { direction }) =>
    compose(
      css(stylesheet['.psds-carousel__controls__control']),
      css(stylesheet[`.psds-carousel__controls__control--${direction}`])
    ),
  controlButton: (themeName, { direction }) =>
    compose(
      css(stylesheet['.psds-carousel__controls__control__button']),
      css(
        stylesheet[
          `.psds-carousel__controls__control__button.psds-theme--${themeName}`
        ]
      )
    )
}

interface ControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  onClick?: (evt?: React.MouseEvent) => void
  direction: ValueOf<typeof vars.controlDirections>
}
interface ControlStatics {
  directions: typeof vars.controlDirections
}
type ControlComponent = React.FC<ControlProps> & ControlStatics
export const Control: ControlComponent = props => {
  const context = React.useContext(CarouselContext)
  const themeName = useTheme()

  const { activePage, pageCount, next, prev, setTransitioning } = context

  const isPrev = props.direction === Control.directions.prev
  const visible = isPrev ? activePage > 0 : activePage !== pageCount - 1

  const IconCaret = isPrev ? CaretLeftIcon : CaretRightIcon
  const handleClick = combineFns(isPrev ? prev : next, props.onClick, () =>
    setTransitioning(true)
  )
  const scr = `get ${isPrev ? 'previous' : 'next'} carousel page`

  return (
    <div
      data-testid="carousel control"
      {...styles.control(themeName, props)}
      {...(!visible && { hidden: true })}
    >
      <Halo shape={Halo.shapes.pill}>
        <button
          {...filterReactProps(props, { tagName: 'li' })}
          onClick={handleClick}
          aria-label={scr}
          {...styles.controlButton(themeName, props)}
          {...(!visible && { tabIndex: -1 })}
        >
          <IconCaret aria-hidden size={iconSizes.medium} />
        </button>
      </Halo>
    </div>
  )
}
Control.displayName = 'Carousel.Control'

Control.directions = vars.controlDirections
