import {ReactNode} from 'react';
import IconImage from './IconImage';
import personalInfo from './data/personalInfo.json';

interface BoxProps {
    href: string;
    label: string;
    onClick?: () => void;
    children: ReactNode;
}

const Box = ({href, label, onClick, children}: BoxProps) => (
    <a target="_blank"
        rel="noopener noreferrer"
        href={href}
        aria-label={label}
        className="flex h-9 w-9 select-none items-center justify-center rounded-sm border border-line bg-paper-card opacity-80 grayscale transition hover:border-ink hover:opacity-100 hover:grayscale-0"
        onClick={onClick}>
        {children}
    </a>
);

const SupportingBox = (): JSX.Element => {
    return (
        <div className="flex items-center gap-3">
            <Box href="/cv.pdf" label="CV">
                <IconImage path='/images/cv-file-interface-symbol-svgrepo-com.svg' name="CV"/>
            </Box>
            <Box href={personalInfo.socialMedia.Twitter} label="Twitter">
                <IconImage path='/images/icons8-twitter.svg' name="Twitter"/>
            </Box>
            <Box href={personalInfo.socialMedia.LinkedIn} label="LinkedIn">
                <IconImage path='/images/icons8-linkedin.svg' name="LinkedIn"/>
            </Box>
            <Box href={personalInfo.socialMedia.GoogleScholar} label="GoogleScholar">
                <IconImage path='/images/icons8-google-scholar.svg' name="GoogleScholar"/>
            </Box>
        </div>
        );
};

export default SupportingBox;
