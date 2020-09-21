-- file: script.sql

-- object: pick_a_plate
-- cursor: c_lp
 select p.location, p.quantity, l.section, l.equipprof, p.parentlpid, p.lotnumber, p.useritem1, p.useritem2, p.useritem3, p.serialnumber, p.type, l.pickingseq, l.pickingzone, p.inventoryclass, p.invstatus, p.weight, p.status, p.virtuallp, p.manufacturedate, p.expirationdate, l.loctype, nvl(p.qtytasked, 0) qtytasked, p.lpid, p.qtyrcvd, p.length, p.width, p.height, p.pallet_weight from plate p, location l where p.lpid = p_lpid and l.facility = in_pickfac and l.locid = p.location;

-- object: pick_a_plate
-- cursor: curchildren
 select lpid, weight, fromlpid, custid, item, pickuom, orderid, shipid, orderitem, orderlot, type from shippingplate where parentlpid = in_parentlpid;

-- object: pick_a_plate
-- cursor: curplatechildren
 select lpid from plate where parentlpid = in_parentlpid;

-- object: pick_a_plate
-- cursor: curchildplatesummary
 select count(1) as count, sum(quantity) as quantity from shippingplate where parentlpid = in_parentlpid;

-- object: pick_a_plate
-- cursor: curorderdtl
 select * from orderdtl where orderid = in_orderid and shipid = in_shipid and item = in_orderitem and nvl(lotnumber, '(none)') = nvl(in_orderlot, '(none)');

-- object: pick_a_plate
-- cursor: curanyshippingplate
 select lpid from shippingplate where fromlpid in(select lpid from plate start with lpid = in_carton connect by prior lpid = parentlpid);

