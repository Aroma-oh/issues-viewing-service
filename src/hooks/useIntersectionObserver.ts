import {useCallback, useEffect, useRef} from 'react';

interface Options {
    root: Element | null;
    rootMargin: string;
    threshold: number;
}

const options: Options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
};

export const useInfiniteScroll = (callback: () => Promise<void>) => {
    const ref = useRef<HTMLDivElement>(null);

    const observerCallback: IntersectionObserverCallback = useCallback(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                }
            });
        },
        [callback]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, options);

        const currentRef = ref.current;

        if (!currentRef) return;
        observer.observe(currentRef);

        return () => {
            observer.disconnect();
        };
    }, [observerCallback]);

    return ref;
};
