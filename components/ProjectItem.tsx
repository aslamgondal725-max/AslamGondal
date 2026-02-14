interface ProjectProps {
  project: any;
  index: number;
}

const ProjectItem = ({ project, index }: ProjectProps): JSX.Element => {
  return (
    <div className="shadow-lg mb-8 mx-auto lg:w-11/12 lg:flex lg:flex-row lg:h-auto">
      {project.image ? (
        // Fixed-size image container so all cards look consistent
        <div className="w-full lg:w-6/12 h-72 lg:h-auto overflow-hidden rounded-tr-lg rounded-tl-lg lg:rounded-none lg:rounded-l-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        // Placeholder if no image provided
        <div className="w-full lg:w-6/12 h-72 lg:h-auto bg-gray-100 rounded-tr-lg rounded-tl-lg lg:rounded-none lg:rounded-l-lg" />
      )}

      <div className="w-full bg-gray-50 p-8 rounded-bl-lg rounded-br-lg lg:rounded-bl-none lg:rounded-tr-lg">
        <h2 className="text-gray-700 font-semibold">{project.title}</h2>
        <p className="text-sm text-gray-500 mt-4">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
