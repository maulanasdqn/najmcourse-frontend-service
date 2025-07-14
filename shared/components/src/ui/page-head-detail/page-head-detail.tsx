import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC, ReactElement } from "react";
import { Link } from "react-router";
import { TPageHeadDetailProps } from "./type";

export const PageHeadDetail: FC<TPageHeadDetailProps> = (props): ReactElement => {
  return (
    <section className="flex w-full items-center justify-between mb-6">
      <div className="flex items-center w-full justify-between gap-x-2">
        <div className="flex gap-x-2 items-center">
          <Link to={props.backRoute ?? "#"}>
            <Button
              className="flex justify-center items-center"
              type="text"
              icon={<ArrowLeftOutlined size={30} />}
            />
          </Link>
          <h2
            style={{
              marginBottom: "0px",
            }}
            className="text-xl font-semibold mb-0"
          >
            {props.title}
          </h2>
        </div>
        {props.onSubmit && (
          <Button
            disabled={props.disabled ?? props.isLoading}
            onClick={props.onSubmit}
            type="primary"
            htmlType="button"
            loading={props.isLoading}
          >
            Simpan
          </Button>
        )}
      </div>
    </section>
  );
};
