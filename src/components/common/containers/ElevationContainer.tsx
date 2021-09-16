import './scss/ElevationContainer.scss';

interface IElevationContainerProps {
    children: JSX.Element | JSX.Element[],
    className?: string,
}
export const ElevationContainer = ({
    children,
    className,
}: IElevationContainerProps) => <div className={`elevation-container ${className}`}>{children}</div>;
