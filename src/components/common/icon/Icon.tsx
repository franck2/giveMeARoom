import { useEffect, useState } from 'react';

import { IconDefinition, library } from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconKeyEnum } from '../../../types/components/common/icon/IconKeyEnum';
import { IIconParams } from '../../../types/components/common/icon/IIconParams';
import { iconsMapping } from './iconsMapping';

interface IIConProps {
    iconKey: IconKeyEnum,
}

export const Icon = ({ iconKey }: IIConProps) => {
    const [iconParams] = useState<IIconParams>(iconsMapping[iconKey]);


    useEffect(() => {
        library.add(iconParams.iconDefinition as IconDefinition);
    });

    return (
        <FontAwesomeIcon icon={iconParams.iconDefinition}/>
    );
};
