import Image from "next/image";

const ProfileImage = (): JSX.Element => {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-emerald-400/20 blur-xl" />
      <Image
        src="/images/ProfilePhoto.png"
        alt="Muhammad Aslam"
        width={280}
        height={280}
        priority
        draggable={false}
        className="select-none rounded-[1.75rem] border border-white/70 bg-white/40 object-cover shadow-xl ring-1 ring-slate-200/70 dark:border-slate-800 dark:bg-slate-900/40 dark:ring-slate-700"
      />
    </div>
  );
};

export default ProfileImage;
