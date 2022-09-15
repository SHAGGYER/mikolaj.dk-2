import React from "react";

export function LazyLoadImage({ src: ImageSrc, lazyLoadSrc, root, rootMargin, threshold, alt, ...props }) {
    const [src, setSrc] = React.useState(false);
    const imageRef = React.useRef<any | null>(null);

    const callback = React.useCallback((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setSrc(ImageSrc);
        }
    }, []);

    React.useEffect(() => {
        const observer = new IntersectionObserver(callback, {
            root,
            rootMargin,
            threshold,
        });
        observer.observe(imageRef.current);
        return () => {
            observer.disconnect();
        };
    }, [callback, root, rootMargin, threshold, imageRef]);

    return <img src={src || lazyLoadSrc} alt={alt} {...props} />;
}