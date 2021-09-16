import { cloneElement } from 'react';

import { PopoverProps,
    PopoverDisclosure,
    usePopoverState,
    Popover,
    PopoverArrow } from 'reakit';

interface IPopoverCustomProps {
    children: JSX.Element | string,
    disclosure: JSX.Element,
    disabled?: boolean,
}

export const PopoverCustom = ({ disabled, disclosure, ...props }: IPopoverCustomProps & PopoverProps) => {
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
            <Popover {...popover} {...props} className={'info-slot-popover'} tabIndex={0}>
                <PopoverArrow {...popover} className={'arrow-popover'} />
                {props.children}
            </Popover>
        </>
    );
};
