import Image from "next/image";

const ProfileImage = (): JSX.Element => {
  return (
    <Image
      src="/images/ProfilePhoto.png"
      alt="Muhammad Aslam"
      width={260}
      height={260}
      priority
      draggable={false}
      className="rounded-full select-none pointer-events-none object-cover"
    />
  );
};

export default ProfileImage;
