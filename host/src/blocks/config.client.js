import { lazy } from 'react';

export default {
    blog: {
        component: lazy(() => import('Blog/App')),
    }
}