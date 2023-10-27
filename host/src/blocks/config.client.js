import { lazy } from 'react';

export default {
    weather: {
        component: lazy(() => import('Weather/App')),
    }
}