import { ReactElement, SVGProps } from "react";
import type { SvgIcons } from "./IconNames";
export type IconNames = SvgIcons;
export type IconProps = SVGProps<SVGSVGElement> & {
	icon: SvgIcons;
	className?: string;
	size?: number;
	stroke?: string;
};

const Icon = ({
	icon,
	size = 20,
	fill = "currentColor",
	stroke = "",
	...props
}: IconProps): ReactElement => {
	return (
		<svg width={size} height={size} fill={fill} stroke={stroke} {...props}>
			<use xlinkHref={`/assets/icon/sprite.svg#${icon}`} />
		</svg>
	);
}
export default Icon;