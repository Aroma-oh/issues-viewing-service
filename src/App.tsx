import styled from 'styled-components';
import {Outlet} from 'react-router-dom';
import {RecoilRoot} from 'recoil';

import Header from 'components/common/Header';

const App = () => {
    return (
        <RecoilRoot>
            <Header />
            <WrapperStyle>
                <Outlet />
            </WrapperStyle>
        </RecoilRoot>
    );
};

export default App;

const WrapperStyle = styled.main`
    max-width: 768px;
    margin: 100px auto 0 auto;
`;
