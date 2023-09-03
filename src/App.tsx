import Header from 'components/Header';
import Loading from 'pages/Loading';
import {Outlet} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {Suspense} from 'react';

const App = () => {
    return (
        <RecoilRoot>
            <Header />
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </RecoilRoot>
    );
};

export default App;
