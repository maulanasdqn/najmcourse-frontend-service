import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC, ReactElement } from "react";
import { useNavigate } from "react-router";
import { TPageHeadDetailProps } from "./type";

export const PageHeadDetail: FC<TPageHeadDetailProps> = (props): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-x-2 mb-6">
        <Button
          className="flex justify-center items-center"
          type="text"
          icon={<ArrowLeftOutlined size={30} />}
          onClick={() => navigate(-1)}
        />
        <h2
          style={{
            marginBottom: "0px",
          }}
          className="text-xl font-semibold mb-0"
        >
          {props.title}
        </h2>
      </div>
    </div>
  );
};
