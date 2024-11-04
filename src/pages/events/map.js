export default function EventMap({ location }) {
    const q = (location && location !== '') ? location : "Calgary, Alberta, Canada";
    const api_key = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const src = `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${q}`;
    return (
        <iframe
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
            allowFullScreen>
        </iframe>
        
    );

}