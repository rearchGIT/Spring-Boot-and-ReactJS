package com.react.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    /*Note that the methods are not calling a service method - in fact there is no service layer at all
     *The View layer sends ajax queries directly to the repository layer*/
    
    @RequestMapping("/")
    public String slash() {
	log.debug("**/slash**");
	return "index";
    }
    
    @RequestMapping("/index")
    public String index() {
	log.debug("**/index**");
	return "index";
    }

}
