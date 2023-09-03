import {getIssuesDetail} from 'apis/issues';
import {useEffect, useState} from 'react';
import {IssueType} from 'types/Issues';
import {useParams} from 'react-router-dom';
import IssueItem from 'components/IssueItem';
import IssueBody from 'components/IssueBody';
import LoadingSpinner from 'components/LoadingSpinner';

const DetailContainer = () => {
    const [latestData, setLatestData] = useState<IssueType>();
    const {id} = useParams();

    const fetchData = async () => {
        if (id) {
            const response = await getIssuesDetail(id);
            setLatestData(response.data);
            // console.info(response);
        }
        // id가 유효하지 않으면 !latestData -> 아래의 !latestData return에서 걸림
        // 여기서 id가 유효하지 않을때 에러 처리 못함
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!latestData) return <LoadingSpinner />; // 현재는 로딩 처리중인데, 만약 데이터 로드 실패 에러라면?

    return (
        <>
            <IssueItem issue={latestData} />
            <IssueBody body={latestData.body} />
        </>
    );
};

export default DetailContainer;
