from typing import List
from psycopg import connect

from algolia import AlgoliaIndex


def get_data(dsn: str) -> List[AlgoliaIndex]:
    """
    dsn: conn string to postgres db
    """
    with connect(dsn) as conn:
        with conn.cursor() as cur:
            sql = """
            SELECT 
                Course.title,
                Course.term,
                Course.description,
                Course.subject,
                Course.code,
                Course.pid,
                Falculty.name
            FROM Section
                JOIN
                    Course 
                        ON Section.courseId=Course.id
                    FacultiesOnSection
                        ON FacultiesOnSection.sectionId=Section.id
                        AND FacultiesOnSection.falcultyId=Falculty.id
            ;
            """
            cur.execute(sql).fetchall()

            buf: List[AlgoliaIndex] = []
            for row in cur:
                (name, term, desc, sub, code, pid, prof) = row

                index = AlgoliaIndex(
                    name=name,
                    term=term,
                    description=desc,
                    subject=sub,
                    code=code,
                    pid=pid,
                    in_session=True,
                    profs=prof,
                )

                buf.append(index)

            return buf
