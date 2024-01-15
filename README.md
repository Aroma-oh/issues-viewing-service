# 📝 Issues viewing service
#### 과제 소개 
* 특정 깃헙 레파지토리의 `이슈 목록`과 `상세 내용`을 확인할 수 있는 웹 페이지입니다.
* 이슈 목록에서는 `무한 스크롤`로 데이터 리패칭을 제공합니다.
* 원티드 프리온보딩 2주차 개인 과제로 진행했습니다.
* 진행 기간: 23.08.29 ~ 23.08.31

#### 기술 스택
* React, TypeScript, Recoil, Styled-component, Axios

#### 배포링크 및 데모영상
-   배포 링크로 [확인하기](https://issues-viewing-service-1nk3mwg9k-aroma-oh.vercel.app/repos/facebook/react/issues)
-   데모 영상으로 확인하기
  
  | `/issue` | `/issue/:id` |
  |:---:|:---:|
  |![issue-list](https://github.com/Aroma-oh/pre-onboarding-12th-2-11/assets/115550622/48700c27-3415-445f-a02f-df911bdad0a8)|![issue-detail](https://github.com/Aroma-oh/pre-onboarding-12th-2-11/assets/115550622/1407219c-aff7-4881-9826-a5d58661d4f3)|

#### 실행 방법
```
$ npm install
$ npm start
```

#### 폴더 구조 
* 관심사 분리를 위해 로직을 담당하는 컴포넌트(`containers`)와 UI를 담당하는 컴포넌트(`components`)를 나누었습니다. 
    ```
    src
    ├── apis
    ├── components    // 독립적으로 설계된 컴포넌트입니다.
    │   ├── common
    │   ├── issue
    │   └── skeleton
    ├── constants
    ├── containers    // 데이터 패칭 등의 로직을 담당하는 컴포넌트입니다.
    ├── hooks
    ├── pages         // 라우팅 단위가 될 컴포넌트입니다.
    ├── recoil
    ├── styles
    └── types
    ```
---

## ⛳️ 개발 주안점

### `1. 비동기 통신을 적절하게 처리하자!`

-   이슈 목록 페이지에서는 무한 스크롤 기능이 필요합니다. 성능 이슈를 고려하여 옵저버 패턴으로
    개발을 선택했기 때문에 관측 후, 데이터가 패칭되어 뷰포트에서 사라지기 전까지는 추가 데이터
    요청을 방지하는 것이 중요했습니다.
-   이를 위해서 비동기 통신에서의 로딩 상태 관리가 필요하다고 생각했고, 비동기 통신에 따른
    로딩/성공/실패의 상태를 '잘' 관리하는 것을 주안점으로 삼았습니다.

#### 1-1. 상태 관리

-   뒤로가기로 페이지를 돌아왔을 때 무한 스크롤 위치가 고정되어 있는 것이 사용성이 더 높다고 판단하였기에 전역 상태
    관리를 선택했습니다.
-   또한 로딩/성공/실패는 하나의 액션에서 파생되며, 각 상태가 연결되어 있다고 생각하기 때문에 하나의
    상태로 만들어 관리했습니다.
    ```js
    // src/recoil/atoms.ts
    export const fetchIssueState =
        atom <
        IssueStateType >
        {
            key: 'fetchIssueState',
            default: {
                loading: true, // 스켈레톤 ui를 위한 최초 데이터 로딩 상태입니다.
                fetching: true, // 스피너 ui를 위한 추가 데이터 패칭 상태입니다.
                error: '',
                data: [],
            },
        };
    ```

#### 1-2. 상태 업데이트

-   데이터 패칭과 관련된 상태 업데이트는 모두 `useFetchData` 커스텀 훅에서 담당합니다.
-   로딩/성공/에러를 모두 처리하기 위해서는 api 1회 호출에도 다수의 상태를 업데이트 코드 작성이
    예상되었습니다. 따라서 불필요한 중복을 줄이기 위해 관련 로직을 커스텀 훅으로 분리하였습니다.

#### 1-3. 로딩, 에러 처리하기

-   로딩 처리는 전체 페이지 로딩과 추가 데이터 로딩으로 나누어 처리했습니다.
-   전체 페이지 로딩은 `loading` 상태가 관리하며, 스켈레톤 UI로 처리하여 체감 대기 시간을 낮추고자
    하였습니다.
-   추가 데이터 패칭은 `fetching` 상태가 관리하며, 스크롤을 내리는 액션에서 사용자에게 즉각적인
    응답을 주고자 스피너 UI를 사용했습니다.
-   에러는 `error` 상태가 관리하며, 에러 메시지 코드를 제공하여 사용자의 딥답함을 줄이고자 했습니다.

### `2. 관심사 분리로 재사용성을 높이자!`

#### 2-1. 컴포넌트 분리하기

-   각 컴포넌트는 아래의 목적만을 가지도록 분리했습니다.

    ```
    Page
    * 라우팅의 단위가 될 컴포넌트이다.
    * 단순 래핑의 역할과 SEO를 위한 메타태그 설정의 역할만 한다.

    Container
    * UI 컴포넌트를 컨트롤하는 역할이다.
    * 데이터 패칭, 이벤트 처리 등의 비즈니스 로직은 컨테이너가 담당한다.

    Component
    * 순수하게 UI 로직만 가지고 있다.
    * UI 관련 상태, 이벤트 핸들링만을 처리한다. 이 외는 모두 컨테이너로부터 주입 받아야 한다.
    * 반드시 독립적으로 설계되어 재사용 가능해야 한다.
    ```

#### 2-2. 커스텀 훅 분리하기

-   컨테이너에서 명확한 목적을 가지는 로직은 커스텀 훅으로 만들어 관심사를 분리하고자 했습니다.
  
    **`useFetchData`**
    * 비동기 통신의 로딩/성공/에러 처리 결과를 업데이트하기 위한 목적의 훅입니다.
    * 커스텀 훅의 재사용성을 위해 내부에서 상태를 불러오는 대신, 업데이트 될 상태를 주입 받는 방식으로 구현했습니다. 
    https://github.com/Aroma-oh/issues-viewing-service/blob/ee850b79622301a6a8a7ae8514c20f782bd7a9c5/src/hooks/useFetchData.ts#L11-L43

    **`useGetNextPage`**
    * 마지막 페이지까지 페이지를 증가시키며 fetchData(by useFetchData)를 호출하는 역할을 합니다.
      https://github.com/Aroma-oh/issues-viewing-service/blob/ee850b79622301a6a8a7ae8514c20f782bd7a9c5/src/hooks/useGetNextPage.ts#L6-L25
    
    **`useIntersectionObserver`**
    * 요소가 관측되면 주입 받은 콜백함수를 실행하는 역할을 합니다.
    * 프로젝트에서는 getNextPage(by useGetNextPage)를 콜백으로 넘겨주었습니다.
        https://github.com/Aroma-oh/issues-viewing-service/blob/ee850b79622301a6a8a7ae8514c20f782bd7a9c5/src/containers/ListContainer.tsx#L26-L27
        https://github.com/Aroma-oh/issues-viewing-service/blob/ee850b79622301a6a8a7ae8514c20f782bd7a9c5/src/hooks/useIntersectionObserver.ts#L15-L42
### `3. 최적화하기`

-   무한 스크롤 기능을 구현하면서 방대해질 데이터가 우려되었습니다. 특히 이슈 상세 페이지에서 → 목록
    페이지로 되돌아왔을 때 이전에 무한 스크롤로 불러온 모든 목록을 제공하기 때문에 렌더링 시간이
    길어질 우려가 있었습니다.
-   따라서 각 이슈 아이템을 메모이제이션하여 렌더링 시간을 줄이고자 했습니다.
-   적용 전 `12.7s` → 적용 후 `7s`로 렌더링 시간의 약 `49% 감소 효과`가 있었습니다.

    |As Is | To Be|
    |:---:|:---:|
    |![asis](https://github.com/Aroma-oh/pre-onboarding-12th-2-11/assets/115550622/082f0123-a91d-4fc5-8ab5-de4b1694ba86)|![tobe](https://github.com/Aroma-oh/pre-onboarding-12th-2-11/assets/115550622/78fea720-f85e-4c43-9466-6a5dd3c3b826)|

    
---

## 🎊 팀프로젝트 결과물 [(바로가기)](https://github.com/wanted-pre-onboarding-12th-11/pre-onboarding-12th-2-11)

-   개인 과제를 종합하여 best practice를 찾아내는 팀 과제 링크입니다.
