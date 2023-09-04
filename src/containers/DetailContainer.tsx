// import react, react-router-dom, styled
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
// import component
import Item from 'components/common/Item';
import Body from 'components/Body';
// import custom hook
import {useAxios} from 'hooks/useFetchData';
// import recoil
import {fetchDetailState} from 'recoil/atoms';
import {useRecoilValue} from 'recoil';
import {PATH} from 'constants/apis';

const DetailContainer = () => {
    const {id} = useParams();

    const {fetchData} = useAxios('detail', fetchDetailState, `${PATH}/${id}`);

    const issueState = useRecoilValue(fetchDetailState);
    const {loading, error, data} = issueState;

    useEffect(() => {
        const params = {issue: Number(id), state: 'open'};
        fetchData({params});
    }, [fetchData, id]);

    if (loading) return <>컨테이너 로딩중</>;
    if (error) return <>에러</>;

    return (
        <ContainerStyle>
            <InfoStyle>
                <ProfileStyle src={data[0].user.avatar_url} alt='사용자 프로필  사진' />
                <Item issue={data[0]} list={true} />
            </InfoStyle>
            <Body body={data[0].body} />
        </ContainerStyle>
    );
};

export default DetailContainer;

const ContainerStyle = styled.div`
    border: var(--border-line);
    margin: 24px auto;
    border-radius: var(--border-radius);
    overflow: hidden;
`;

export const InfoStyle = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 21px;
`;

export const ProfileStyle = styled.img`
    border-radius: 50%;
    width: 75px;
    height: 75px;
    display: inline-block;
`;
