CREATE OR REPLACE FUNCTION getViewBox(TEXT) RETURNS TEXT AS $$ 

	DECLARE 
             nome1 ALIAS FOR $1;
	     viewBox TEXT;
	     BEGIN
		  SELECT INTO viewBox CAST(ST_xmin(ST_Envelope(geom)) as varchar) || ' ' || 
                  CAST(ST_ymax(ST_Envelope(geom)) * -1 as varchar) || ' ' ||
                  CAST(ST_xmax(ST_Envelope(geom)) - ST_xmin(ST_Envelope(geom)) as varchar) || ' ' ||
                  CAST(ST_ymax(ST_Envelope(geom)) - ST_ymin(ST_Envelope(geom)) as varchar)
                  FROM municipio
                  WHERE nome ilike nome1;
	          return viewBox;
	END;
	
$$language plpgsql;