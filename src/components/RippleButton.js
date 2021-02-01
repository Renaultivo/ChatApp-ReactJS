import { useEffect } from "react";
import { useState } from "react";
import styled from 'styled-components';

const RippleElement = styled.div`
	top: ${props => props.top}px;
	left: ${props => props.left}px;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	position: absolute;
	animation: ${props => props.animation};
	border-radius: 50%;
	pointer-events: none;
	background-color: #000000;
`;

export default function RippleButton(props) {

	let isMount = true;

	const [rippleState, setRippleState] = useState(false);
	
	const [clickInfo, setClickInfo] = useState({
		top: 0,
		left: 0,
		target: null
	});

	const [rippleSettings, setRippleSettings] = useState({
		top: 0,
		left: 0,
		size: 0,
		animation: ''
	});

	const rippleElement = (
		<RippleElement
			top={rippleSettings.top}
			left={rippleSettings.left}
			size={rippleSettings.size}
			animation={rippleSettings.animation} />
	);

	useEffect(() => {

		if (clickInfo.target != null
			&& rippleState
			&& props.disable != "true") {

			let size = Math.max(clickInfo.target.offsetWidth, clickInfo.target.offsetHeight) * 2;

			setRippleSettings({
				top: clickInfo.top - (size/2),
				left: clickInfo.left - (size/2),
				size,
				animation: 'rippleEffect linear 0.5s'
			});

			setTimeout(() => {
				if (isMount) {
					setRippleState(false);
				}
			}, 490);

		}

		return () => {
			isMount = false;
		}

	}, [clickInfo]);

	return (
		<button
			{...props}
			className={props.className}
			style={{...props.style, position: 'relative', overflow: 'hidden'}}
			onMouseDown={function(e) {

				if (rippleState) {
					return;
				}

				setClickInfo({
					top: e.nativeEvent.offsetY,
					left: e.nativeEvent.offsetX,
					target: e.target
				});

				setRippleState(true);

			}}>
				{props.children}
				{ rippleState && isMount ? rippleElement : null }
		</button>
	);

}