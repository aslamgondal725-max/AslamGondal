import Image from 'next/image';

interface Props {
    path: any;
    name: any;
}

const IconImage = ({path, name}: Props): JSX.Element => {
    return (
        <abbr title={name} className="no-underline">
            <Image src={path}
                draggable={false}
                alt={name}
                width={35}
                height={35}
                className="grayscale opacity-80 mix-blend-multiply transition duration-300 hover:grayscale-0 hover:opacity-100"/>
        </abbr>
    );
};

export default IconImage;
