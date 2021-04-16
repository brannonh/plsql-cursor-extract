procedure pick_a_plate
   (in_taskid          in number,
    out_error          out varchar2)
is
   errmsg varchar2(200);

  cursor curOrderDtl(in_orderid number, in_shipid number,
    in_orderitem varchar2, in_orderlot varchar2) is
    select *
      from orderdtl
     where orderid = in_orderid
       and shipid = in_shipid
       and item = in_orderitem
       and nvl(lotnumber,'(none)') = nvl(in_orderlot,'(none)');
  ORL curOrderDtl%rowtype;

  cursor curanyshippingplate is
    select lpid
      from shippingplate
      where fromlpid in (select lpid from plate
                           start with lpid = in_carton
                           connect by prior lpid = parentlpid);
begin

end;
/
