import Link from "next/link";
import { FC } from "react";
import { Pagination } from "react-bootstrap";

const Paginate: FC<{
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
}> = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          href={
            !isAdmin
              ? keyword
                ? `/search/query=${keyword}&page=${x + 1}`
                : `/?page=${x + 1}`
              : `/admin/productList/${x + 1}`
          }
          passHref
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </Link>
      ))}
    </Pagination>
  ) : (
    <div></div>
  );
};

export default Paginate;
