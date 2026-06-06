interface Props {
	href: string;
	children: React.ReactNode;
}

const ExtLink = ({href, children}: Props) => (
	<a
		href={href}
		className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
		target="_blank"
		rel="noopener noreferrer">
		{children}
	</a>
);

export default ExtLink;
