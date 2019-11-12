create or replace function getCidade(TEXT) returns text as $$
declare 
estado Alias for $1;
cidade text;
begin 
	for estado in select m.nome FROM municipio m, estado e  WHERE e.nome ilike estado AND ST_Within(m.geom, e.geom) is not null loop
	return cidade;
	end loop;
	end;
$$language plpgsql;