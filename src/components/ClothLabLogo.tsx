interface LogoProps {
    variant?: 'light' | 'dark';
    height?: number;
}

/**
 * ClothLab Logo — faithful SVG recreation of the hexagonal LC monogram.
 * The mark is composed of:
 *  - An outer hexagonal "C" frame (5 sides, right side open) in teal
 *  - An inner "L" shape in teal sitting at bottom-left inside the C
 * Both together read as "LC" inside a hex bracket.
 */
const ClothLabLogo = ({ variant = 'light', height = 36 }: LogoProps) => {
    const textColor = variant === 'dark' ? '#FFFFFF' : '#2B3580';
    const markWidth = height * (100 / 86); // SVG viewBox is 100×86

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {/* ── Hexagonal LC Mark ── */}
            <svg
                width={markWidth}
                height={height}
                viewBox="0 0 100 86"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/*
         * Flat-top hexagon vertices (radius ≈ 42px, centre 50,43):
         *   TL (22, 1)  TR (78, 1)
         *   L  ( 2, 43) R  (98, 43)   ← right side is OPEN for the C
         *   BL (22, 85) BR (78, 85)
         *
         * The C outer frame: polyline TL→L→BL→BR drawn with thick stroke.
         * The opening is on the right side (TR→R→BR path is absent).
         *
         * Stroke width = 16 → gives ≈8px inner padding.
         * strokeLinejoin="miter" preserves the sharp hex corners.
         */}

                {/* Outer hexagonal C border */}
                <polyline
                    points="78,4  22,4  2,43  22,82  78,82"
                    stroke="#00A8A8"
                    strokeWidth="15"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                />

                {/*
         * Inner L shape — sits flush to the bottom-left inside the C.
         * Vertical bar goes from near top to ~60% height.
         * Horizontal bar extends right from bottom of vertical.
         * Coordinates are calibrated so the L is visually centred
         * inside the C opening.
         */}
                <polyline
                    points="38,17  38,70  62,70"
                    stroke="#00A8A8"
                    strokeWidth="14"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                />
            </svg>

            {/* ── Clothlab wordmark ── */}
            <span
                style={{
                    fontFamily: "'Outfit', 'Nunito', 'Righteous', sans-serif",
                    fontWeight: 800,
                    fontSize: height * 0.72,
                    color: textColor,
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                    userSelect: 'none',
                }}
            >
                Clothlab
            </span>
        </div>
    );
};

export default ClothLabLogo;
