<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Index extends Controller_Template {

    public $template = "v_index";

	public function action_index()
	{
		$this->template->title = "Hello Kohana";
	}

}
