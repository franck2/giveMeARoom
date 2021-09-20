import { cloneElement } from 'react';

import { PopoverProps,
    PopoverDisclosure,
    usePopoverState,
    Popover,
    PopoverArrow } from 'reakit';

import './scss/PopoverCustom.scss';
interface IPopoverCustomProps {
    children: JSX.Element | string,
    disclosure: JSX.Element,
    disabled?: boolean,
    label: string,
}

export const PopoverCustom = ({
    label,
    disabled,
    disclosure,
    ...props
}: IPopoverCustomProps & PopoverProps) => {
    const popover = usePopoverState({
        placement: 'top-start',
    });

    return (
        <>
            <PopoverDisclosure
                {...popover}
                {...disclosure.props}
                disabled={disabled}
            >
                {(disclosureProps) => cloneElement(disclosure, disclosureProps)}
            </PopoverDisclosure>
            <Popover
                {...popover}
                {...props}
                className={'info-slot-popover'}
                tabIndex={0}
                aria-label={label}
            >
                <PopoverArrow {...popover} className={'arrow-popover'} />
                {props.children}
            </Popover>
        </>
    );
};
