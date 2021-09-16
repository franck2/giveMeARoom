import { render, screen } from '@testing-library/react';

import { TimeLineSlot } from '../TimeLineSlot';
import { mockFreeSlot } from './mocks/mockSlots';

describe('TimeLineSlot', () => {
    test('should free slot do not have pinter event and have free class', () => {
        render(<TimeLineSlot slot={mockFreeSlot}/>);

        expect(screen.getByRole('button')).toBeDefined();
        expect(screen.getByRole('button')).toHaveStyle({
            'pointer-events': 'none',
        });
        expect(screen.getByRole('button')).toHaveClass('free');
    });
});
