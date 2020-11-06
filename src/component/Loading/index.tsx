import React from 'react';
import { Loader, LoadingContainer } from './styles';



const Loading: React.FC = () => {
    return <LoadingContainer><Loader>Loading...</Loader></LoadingContainer>;
}

export default Loading;