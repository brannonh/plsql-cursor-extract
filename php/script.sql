procedure pick_a_plate
   (in_taskid          in number,
    in_shlpid          in varchar2,
    in_user            in varchar2,
    in_plannedlp       in varchar2,
    in_pickedlp        in varchar2,
    in_custid          in varchar2,
    in_item            in varchar2,
    in_orderitem       in varchar2,
    in_lotno           in varchar2,
    in_qty             in number,
    in_dropseq         in number,
    in_pickfac         in varchar2,
    in_pickloc         in varchar2,
    in_uom             in varchar2,
    in_lplotno         in varchar2,
    in_mlip            in varchar2,
    in_picktype        in varchar2,
    in_tasktype        in varchar2,
    in_picktotype      in varchar2,
    in_fromloc         in varchar2,
    in_subtask_rowid   in varchar2,
    in_extra_process   in varchar2,
    in_picked_child    in varchar2,
    in_pkd_lotno       in varchar2,
    in_pkd_serialno    in varchar2,
    in_pkd_user1       in varchar2,
    in_pkd_user2       in varchar2,
    in_pkd_user3       in varchar2,
    in_pickuom         in varchar2,
    in_pickqty         in number,
    in_weight          in number,
    in_taskedlp        in varchar2,
    in_vasid           in varchar2,
    out_lpcount        out number,
    out_error          out varchar2,
    out_message        out varchar2)
is
   errmsg varchar2(200);

   singleonly char(1);
   cnt integer;
   out_msg varchar2(255);

   l_orderid orderhdr.orderid%type;
   l_shipid orderhdr.shipid%type;
   l_type plate.type%type;
   l_uom labelprofileline.uom%type;
   l_profid labelprofileline.profid%type;
   l_msg varchar2(255);
   l_sscc multishipdtl.sscc%type;
   l_keepconfig systemdefaults.defaultvalue%type;

   cursor c_lp(p_lpid varchar2) is
      select P.location, P.quantity, L.section, L.equipprof, P.parentlpid,
             P.lotnumber, P.useritem1, P.useritem2, P.useritem3, P.serialnumber, P.type,
             L.pickingseq, L.pickingzone, P.inventoryclass, P.invstatus, P.weight,
             P.status, P.virtuallp, P.manufacturedate, P.expirationdate, L.loctype,
             nvl(P.qtytasked,0) qtytasked, P.lpid, P.qtyrcvd,
             P.length, P.width, P.height, P.pallet_weight
         from plate P, location L
         where P.lpid = p_lpid
           and L.facility = in_pickfac
           and L.locid = P.location;

   cursor curChildren(in_parentlpid varchar2) is
    select lpid, weight, fromlpid, custid, item, pickuom,
           orderid, shipid, orderitem, orderlot, type
      from shippingplate
     where parentlpid = in_parentlpid;

  cursor curPlateChildren(in_parentlpid varchar2) is
    select lpid
      from plate
     where parentlpid = in_parentlpid;

  cursor curChildPlateSummary(in_parentlpid varchar2) is
    select count(1) as count,
           sum(quantity) as quantity
      from shippingplate
     where parentlpid = in_parentlpid;
  pcs curChildPlateSummary%rowtype;

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
