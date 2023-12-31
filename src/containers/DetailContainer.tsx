// import react, react-router-dom, styled
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
// import component
import Item from 'components/issue/Item';
import Body from 'components/issue/Body';
import DetailSkeleton from 'components/skeleton/DetailSkeleton';
import NotFound from 'components/common/NotFound';
// import custom hook
import {useAxios} from 'hooks/useFetchData';
// import recoil
import {fetchDetailState} from 'recoil/atoms';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {PATH} from 'constants/apis';

const DetailContainer = () => {
    const {id} = useParams();

    const {fetchData} = useAxios('detail', fetchDetailState, `${PATH}/${id}`);

    const issueState = useRecoilValue(fetchDetailState);
    const {loading, error, data} = issueState;

    const resetState = useResetRecoilState(fetchDetailState);

    useEffect(() => {
        const params = {issue: Number(id), state: 'open'};
        fetchData({params});
        window.scrollTo({top: 0});

        return () => {
            resetState();
        };
    }, [fetchData, id, resetState]);

    if (loading) return <DetailSkeleton />;
    if (error) return <NotFound error={error} />;

    return (
        <ContainerStyle>
            <InfoStyle>
                <ProfileStyle>
                    <img src={data[0].user.avatar_url} alt='사용자 프로필  사진' />
                </ProfileStyle>
                <Item issue={data[0]} list={true} />
            </InfoStyle>
            <Body body={data[0].body} />
        </ContainerStyle>
    );
};

export default DetailContainer;

const ContainerStyle = styled.div`
    margin: 24px 21px;
    border: var(--border-line);
    border-radius: var(--border-radius);
`;

export const InfoStyle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 0 21px;
`;

export const ProfileStyle = styled.div`
    width: 75px;
    height: 75px;
    display: inline-block;
    flex-shrink: 0;

    img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
`;
