package ${javafolder}.service.impl;

import com.keer.core.dao.SQLBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ${fullname};
import ${javafolder}.service.I${appfolder?cap_first}BizService;
import com.keer.core.service.impl.GenericBizServiceImpl;

@Service("${appfolder?uncap_first}BizService")
public class ${appfolder?cap_first}BizServiceImpl extends GenericBizServiceImpl<${appfolder?cap_first}> implements I${appfolder?cap_first}BizService {

	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void delete(${appfolder?cap_first} bean, SQLBuilder builder)	throws Exception {
		super.delete(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void update(${appfolder?cap_first} bean, SQLBuilder builder)	throws Exception {
		super.update(bean, builder);
	}
	
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Exception.class)
	public void save(${appfolder?cap_first} bean, SQLBuilder builder)	throws Exception {
		super.save(bean, builder);
	}
}