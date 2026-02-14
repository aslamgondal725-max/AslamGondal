const Teaching = (): JSX.Element => {
  return (
    <section id="academic-experience" className="mt-12">
      <h2 className="text-xl font-bold mb-4">Academic & Teaching Experience</h2>

      <div className="text-gray-700 dark:text-gray-300">
        <p className="font-semibold">Teaching Assistant</p>

        <p className="text-sm italic mb-1">
          Department of Microbiology,{" "}
          <a
            href="https://mic.qau.edu.pk"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Quaid-e-Azam University
          </a>
          , Islamabad, Pakistan
        </p>

        <p className="text-sm italic mb-3">
          01 September 2019 – 31 January 2022
        </p>

        <ul className="list-disc ml-6 space-y-1">
          <li>
            Supervised undergraduate laboratory and practical classes, supporting hands-on experimental training.
          </li>
          <li>
            Facilitated academic communication between students and faculty members to ensure effective course coordination.
          </li>
          <li>
            Assisted faculty in teaching activities, including instructional support and assessment preparation.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Teaching;
