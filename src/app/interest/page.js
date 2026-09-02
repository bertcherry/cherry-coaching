import React from 'react';
import InterestForm from './InterestForm';

export const runtime = 'edge';

export const metadata = {
    title: 'Interest Form',
    description: 'Express interest in 1:1 coaching or custom programming with Cherry Coaching.',
};

const Interest = () => {
    return (
        <InterestForm />
    );
};

export default Interest;
