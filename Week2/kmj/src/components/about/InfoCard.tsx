export const InfoCard = ({
  title,
  contents,
}: {
  title: string;
  contents: Array<string>;
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>
        {contents.map((content, index) => (
          <span key={index}>
            {content}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};
