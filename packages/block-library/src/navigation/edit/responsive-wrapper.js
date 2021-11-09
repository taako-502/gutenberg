/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { close, Icon } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import OverlayMenuIcon from './overlay-menu-icon';

export default function ResponsiveWrapper( {
	children,
	id,
	isOpen,
	isResponsive,
	onToggle,
	isHiddenByDefault,
	useIcon,
} ) {
	if ( ! isResponsive ) {
		return children;
	}
	const responsiveContainerClasses = classnames(
		'wp-block-navigation__responsive-container',
		{
			'is-menu-open': isOpen,
			'hidden-by-default': isHiddenByDefault,
		}
	);
	const openButtonClasses = classnames(
		'wp-block-navigation__responsive-container-open',
		{ 'always-shown': isHiddenByDefault }
	);

	const modalId = `${ id }-modal`;

	return (
		<>
			{ ! isOpen && (
				<Button
					aria-haspopup="true"
					aria-expanded={ isOpen }
					aria-label={ __( 'Open menu' ) }
					className={ openButtonClasses }
					onClick={ () => onToggle( true ) }
				>
					{ useIcon && <OverlayMenuIcon /> }
					{ ! useIcon && (
						<span className="wp-block-navigation__toggle_button_label">
							{ __( 'Menu' ) }
						</span>
					) }
				</Button>
			) }
			<div
				className={ responsiveContainerClasses }
				id={ modalId }
				aria-hidden={ ! isOpen }
			>
				<div
					className="wp-block-navigation__responsive-close"
					tabIndex="-1"
				>
					<div
						className="wp-block-navigation__responsive-dialog"
						role="dialog"
						aria-modal="true"
						aria-labelledby={ `${ modalId }-title` }
					>
						<Button
							className="wp-block-navigation__responsive-container-close"
							aria-label={ __( 'Close menu' ) }
							onClick={ () => onToggle( false ) }
						>
							<Icon icon={ close } />
						</Button>
						<div
							className="wp-block-navigation__responsive-container-content"
							id={ `${ modalId }-content` }
						>
							{ children }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
