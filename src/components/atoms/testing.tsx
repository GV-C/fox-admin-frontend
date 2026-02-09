import "./testing.css";

export interface TestingProps {
  label: string;
}

export const Testing = ({ label }: TestingProps) => {
  return <div className="testingDiv">{label}</div>;
};
