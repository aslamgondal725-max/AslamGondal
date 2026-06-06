import Image from "next/image";

type Props = {
  src?: string;
  name?: string;
  credential?: string;
};

const ProfileImage = ({
  src = "/Profile_photo.jpg",
  name = "Muhammad Aslam",
  credential = "M.Sc.",
}: Props): JSX.Element => {
  return (
    <figure className="overflow-hidden rounded-md border border-line bg-paper-card">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 360px"
          priority
          draggable={false}
          className="select-none object-cover object-[center_22%] grayscale contrast-[1.04]"
        />
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 bg-ink px-4 py-3">
        <span className="font-serif text-lg leading-none text-paper">{name}</span>
        <span className="text-xs font-semibold uppercase tracking-label text-paper/70">
          {credential}
        </span>
      </figcaption>
    </figure>
  );
};

export default ProfileImage;
